export interface DemoInfo {
    fileName?: string;
    filePath?: string;
    code?: string;
    title?: string;
    desc?: string;
    component?: () => JSX.Element;
}
