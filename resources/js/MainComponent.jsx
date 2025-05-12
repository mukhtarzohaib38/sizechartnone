import { BrowserRouter } from "react-router-dom";
import { PolarisProvider } from "./components/providers/PolarisProvider";
import { QueryProvider } from "./components/providers/QueryProvider";
import Routes from "./Routes";

export default function MainComponent() {
    const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
        eager: true,
    });

    return (
        <PolarisProvider>
            <BrowserRouter>
                <QueryProvider>
                    <Routes pages={pages} />
                </QueryProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
}
