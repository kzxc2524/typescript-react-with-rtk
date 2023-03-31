// module.scss import 시 에러 발생 하면 src 폴더 내에 이 파일과 설정을 작성해 형식을 알려주면 됨

declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}
