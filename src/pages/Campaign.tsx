import ActSection from "../components/ActSection";
import { acts } from "../data";
import { useLocalStorage } from "../lib/useLocalStorage";
import { useProgress } from "../lib/useProgress";

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export default function Campaign() {
  const { progress, toggle, reset } = useProgress();
  const [hideCompleted, setHideCompleted] = useLocalStorage("poe2c:v1:hideCompleted", false, isBoolean);

  return (
    <div className="space-y-6">
      <label className="flex min-h-11 items-center gap-3 text-sm text-zinc-300">
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={(event) => setHideCompleted(event.target.checked)}
          className="size-5 accent-amber-500"
        />
        Hide completed
      </label>

      {acts.map((act) => (
        <ActSection
          key={act.id}
          act={act}
          progress={progress}
          hideCompleted={hideCompleted}
          onToggle={toggle}
          onReset={reset}
        />
      ))}
    </div>
  );
}
