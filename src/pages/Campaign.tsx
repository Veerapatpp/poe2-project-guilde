import { acts } from "../data";
import { localize } from "../lib/localize";

export default function Campaign() {
  return (
    <div className="space-y-6">
      {acts.map((act) => (
        <section key={act.id}>
          <h2 className="text-lg font-semibold">{localize(act.name)}</h2>
          <ul className="mt-2 space-y-2">
            {act.quests.map((quest) => (
              <li key={quest.id} className="rounded-lg border border-zinc-800 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span>{localize(quest.name)}</span>
                  {!quest.verified && (
                    <span className="rounded bg-amber-900/50 px-2 py-0.5 text-xs text-amber-300">
                      unverified
                    </span>
                  )}
                </div>
                {quest.notes && <p className="mt-1 text-sm text-zinc-400">{localize(quest.notes)}</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
