// Validates every JSON file in src/data/acts. No dependencies, runs on plain Node.
// Exit code 1 when an error is found. Unverified items only produce a summary line.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ACTS_DIR = new URL("../src/data/acts/", import.meta.url);
// Keep in sync with REWARD_KINDS in src/types/PoeTypes.ts
const REWARD_KINDS = ["passive-point", "resistance", "gem", "item", "other"];
// Keep in sync with ORIGINS in src/types/PoeTypes.ts. "own" = written by us from our own playthrough.
const ORIGINS = ["own"];
// `--release` fails when any item is still copied from a third party (NC license), e.g. before adding ads.
const RELEASE = process.argv.includes("--release");

const errors = [];
const seenActIds = new Set();
const seenActNumbers = new Set();
let unverified = 0;
let total = 0;
let thirdParty = 0;

const isText = (value) => typeof value === "object" && value !== null && typeof value.en === "string" && value.en.trim() !== "";

for (const file of readdirSync(ACTS_DIR).filter((name) => name.endsWith(".json")).sort()) {
  const where = (path) => `${file}: ${path}`;
  let act;
  try {
    act = JSON.parse(readFileSync(join(ACTS_DIR.pathname, file), "utf8"));
  } catch (error) {
    errors.push(where(`invalid JSON (${error.message})`));
    continue;
  }

  if (typeof act.id !== "string" || act.id === "") errors.push(where("id is required"));
  else if (seenActIds.has(act.id)) errors.push(where(`duplicate act id "${act.id}"`));
  else seenActIds.add(act.id);

  if (!Number.isInteger(act.number)) errors.push(where("number must be an integer"));
  else if (seenActNumbers.has(act.number)) errors.push(where(`duplicate act number ${act.number}`));
  else seenActNumbers.add(act.number);

  if (!isText(act.name)) errors.push(where("name.en is required"));

  let actThirdParty = 0;
  // Shared by waypoints and quests: origin must be known, "own" items must be verified.
  const checkOrigin = (item, path) => {
    if (!ORIGINS.includes(item.origin)) errors.push(where(`${path}.origin "${item.origin}" is not allowed`));
    else if (item.origin === "own" && item.verified !== true) errors.push(where(`${path}: origin "own" requires verified: true`));
    else if (item.origin !== "own") actThirdParty += 1;
  };

  const waypointIds = new Set();
  for (const [index, waypoint] of (act.waypoints ?? []).entries()) {
    const path = `waypoints[${index}]`;
    if (typeof waypoint.id !== "string" || waypoint.id === "") errors.push(where(`${path}.id is required`));
    else if (waypointIds.has(waypoint.id)) errors.push(where(`${path}: duplicate id "${waypoint.id}"`));
    else waypointIds.add(waypoint.id);
    if (!isText(waypoint.name)) errors.push(where(`${path}.name.en is required`));
    checkOrigin(waypoint, path);
    if (typeof waypoint.verified !== "boolean") errors.push(where(`${path}.verified must be boolean`));
    else if (!waypoint.verified) unverified += 1;
    total += 1;
  }

  const questIds = new Set();
  for (const [index, quest] of (act.quests ?? []).entries()) {
    const path = `quests[${index}]`;
    if (typeof quest.id !== "string" || quest.id === "") errors.push(where(`${path}.id is required`));
    else if (questIds.has(quest.id)) errors.push(where(`${path}: duplicate id "${quest.id}"`));
    else questIds.add(quest.id);
    if (!isText(quest.name)) errors.push(where(`${path}.name.en is required`));
    checkOrigin(quest, path);
    if (quest.notes !== undefined && !isText(quest.notes)) errors.push(where(`${path}.notes.en is required when notes exist`));
    if (quest.waypointId !== undefined && !waypointIds.has(quest.waypointId)) {
      errors.push(where(`${path}.waypointId "${quest.waypointId}" does not match any waypoint in this act`));
    }
    if (!Array.isArray(quest.rewards)) errors.push(where(`${path}.rewards must be an array`));
    for (const [rewardIndex, reward] of (quest.rewards ?? []).entries()) {
      if (!REWARD_KINDS.includes(reward.kind)) errors.push(where(`${path}.rewards[${rewardIndex}].kind "${reward.kind}" is not allowed`));
      if (!isText(reward.description)) errors.push(where(`${path}.rewards[${rewardIndex}].description.en is required`));
    }
    if (typeof quest.verified !== "boolean") errors.push(where(`${path}.verified must be boolean`));
    else if (!quest.verified) unverified += 1;
    total += 1;
  }

  thirdParty += actThirdParty;
  if (actThirdParty > 0) {
    for (const key of ["name", "url", "license", "licenseUrl", "retrievedAt"]) {
      if (typeof act.source?.[key] !== "string" || act.source[key] === "") errors.push(where(`source.${key} is required while ${actThirdParty} item(s) are not origin "own"`));
    }
  }
}

if (RELEASE && thirdParty > 0) errors.push(`--release: ${thirdParty} item(s) are still copied from a third party (origin is not "own")`);

if (errors.length > 0) {
  console.error(`Data validation failed (${errors.length}):`);
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}

console.log(`Data OK: ${seenActIds.size} act file(s), ${total} item(s), ${unverified} unverified, ${thirdParty} third-party.`);
