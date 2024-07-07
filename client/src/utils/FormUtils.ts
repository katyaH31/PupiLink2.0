export default class FormUtils {
  static getFormError(
    propertyName: string,
    errors: any,
  ): string | undefined {
    const propertyNames = propertyName.split(".");

    let error: any = errors;
    for (var propertyName of propertyNames) {
      error = error[propertyName];

      if (error == undefined) {
        return undefined;
      }
    }

    return error!.message;
  }
}