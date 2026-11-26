import { Link } from "react-router";

export const Home = () => {
    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-bold">PoE2 Companion</h1>
            <p className="text-zinc-400">
                Campaign checklist, timer, resistance tracker and build notes for Path of Exile 2.
            </p>
            <Link to="/campaign" className="inline-block rounded-md bg-zinc-800 px-4 py-2 hover:bg-zinc-700">
                Open campaign checklist
            </Link>
        </div>
    );
};
