export interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

export namespace UIProps {
  export type Default = DefaultProps;

  // HTML Elements
  export type Div = DefaultProps & React.HTMLAttributes<HTMLDivElement>;
  export type Span = DefaultProps & React.HTMLAttributes<HTMLSpanElement>;
  export type Head = DefaultProps & React.HTMLAttributes<HTMLHeadElement>;
  export type Paragraph = DefaultProps & React.HTMLAttributes<HTMLParagraphElement>;
  export type Label = DefaultProps & React.LabelHTMLAttributes<HTMLLabelElement>;
  export type Img = DefaultProps & React.ImgHTMLAttributes<HTMLImageElement>;
  export type Table = DefaultProps & React.TableHTMLAttributes<HTMLTableElement>;

  // HTML Input Elements
  export type Anchor = DefaultProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
  export type Form = DefaultProps & React.FormHTMLAttributes<HTMLFormElement>;
  export type Input = DefaultProps & React.InputHTMLAttributes<HTMLInputElement>;
  export type Button = DefaultProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
  export type TextArea = DefaultProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  export type Select = DefaultProps & React.SelectHTMLAttributes<HTMLSelectElement>;
}
