declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png";
declare module "*.jpeg" {
  const content: string;
  export default content;
}
declare module "*.jpg";