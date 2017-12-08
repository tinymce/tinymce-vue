export type CopyProps<T> = {
  [P in keyof T]: any
};

export interface IPropTypes {
  id: string;
  inline: boolean;
  init: any;
  initialValue: string;
  cloudChannel: string;
  apiKey: string;
  tagName: string;
  onChange: string;
  modelEvents: string[] | string;
  value: string;
}

export const editorProps: CopyProps<IPropTypes> = {
  inline: Boolean,
  id: String,
  init: Object,
  initialValue: String,
  cloudChannel: {
    validator: (val: string) => {
      const validChannels = ['stable', 'testing', 'dev'];
      if (validChannels.indexOf(val.toLowerCase()) !== -1) {
        return true;
      } else {
        // tslint:disable-next-line:no-console
        console.error(`VALIDATION ERROR! cloudChannel should be one of: ${validChannels.join(', ')}`);
        return false;
      }
    }
  },
  apiKey: String,
  tagName: String,
  onChange: String,
  modelEvents: [String, Array],
  value: String
};
