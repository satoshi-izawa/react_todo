declare const ENV: {
  NAME: 'develop' | 'production';
};

declare const BUILD: string;

type ActionTypeCreator<T> = {
  [P in keyof T]: { type: P } & T[P];
}[keyof T];
