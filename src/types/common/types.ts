export interface DataProps {
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    [key: string]: any;
  }
}

export interface TextFieldInterface {
  elementId: string;
  defaultLabel: string;
  name: string;
  type: string;
  placeholder?: string;
  section?: string;
}