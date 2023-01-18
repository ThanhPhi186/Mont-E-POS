import _ from 'lodash';
import {Alert} from 'react-native';
import SimpleToast from 'react-native-simple-toast';

class ErrorHandler {
  error: Error;
  constructor(error: Error) {
    this.error = error;
  }

  isAxiosError = (): boolean => {
    // @ts-ignore
    return this.error.isAxiosError;
  };

  getMessages = (): string[] => {
    if (!this.isAxiosError()) {
      return [this.error.message];
    }

    const error = this.error as unknown as any;
    if (!error.response) {
      return [error.message];
    }
    console.log('error.response.data', error.response.data);
    const {message} = error.response.data;

    if (message) {
      return [message];
    }

    return [];
  };
  getMessage = (): string => {
    if (!this.isAxiosError()) {
      return this.error.message;
    }

    const error = this.error as unknown as any;

    if (!error.response) {
      return error.message;
    }
    const {errors, message} = error.response.data;

    if (errors) {
      return errors;
    }

    if (message) return message;

    return '';
  };

  getFieldsErrorMessages = (): Record<string, string[]> => {
    if (!this.isAxiosError()) {
      return {};
    }

    const error = this.error as any;

    if (!error.response) return {};

    const errors = error.response.data.errors;
    const output: Record<string, string[]> = {};
    if (Array.isArray(errors)) {
      errors.forEach(e => {
        if (!output[e.field]) output[e.field] = [];
        output[e.field].push(e.message);
      });
    }

    return output;
  };

  getAllMessages = () => {
    const defaultMessages = this.getMessages();
    const fieldMessages = this.getFieldsErrorMessages();

    const fieldMessagesFlatten = _.flatten(Object.values(fieldMessages));

    return [...defaultMessages, ...fieldMessagesFlatten];
  };

  getAllMessagesString = () => {
    return this.getAllMessages().join('\n');
  };
}

const errorHandler = (error: Error) => new ErrorHandler(error);

export const showMessageError = (error: any) => {
  if (!error) {
    return;
  }

  const handler = errorHandler(error);
  if (!handler.isAxiosError()) {
    const mess = handler.getMessages().join('\n');
    if (!mess) return;
    Alert.alert('', mess);
    return;
  }

  const anyError = error as any;
  if (!anyError.response) return;

  let mess = anyError?.response?.data?.message;
  const err = anyError?.response?.data?.errors;
  if (mess?.includes('Request')) {
    mess = '';
  }

  if (!mess && err) {
    mess = err[0]?.message;
  }

  if (!mess) return;
  console.log('error mess', mess);
  global.showMessage(mess);
  // SimpleToast.show(mess);
};

export default errorHandler;
