import FormExtensionAbility from '@ohos.app.form.FormExtensionAbility';
import formBindingData from '@ohos.app.form.formBindingData';
import FormInfo from '../common/bean/FormInfo';
import FormUtils from '../common/utils/FormUtils';
import {
  FORM_PARAM_IDENTITY_KEY,
  FORM_PARAM_DIMENSION_KEY,
  FORM_PARAM_NAME_KEY,
} from '../common/constants/CommonConstants';

export default class EntryFormAbility extends FormExtensionAbility {
  onAddForm(want) {
    let formId: string = want.parameters[FORM_PARAM_IDENTITY_KEY];
    let formName: string = want.parameters[FORM_PARAM_NAME_KEY];
    let formDimension: number = want.parameters[FORM_PARAM_DIMENSION_KEY];
    let formInfo: FormInfo = {
      formId: formId,
      formName: formName,
      formDimension: formDimension
    };
    FormUtils.insertFormData(this.context, formInfo);
    let obj = {};
    // Called to return a FormBindingData object.
    let formData = formBindingData.createFormBindingData(obj);
    return formData;
  }

  onUpdateForm() {
    FormUtils.updateCards(this.context);
  }

  onRemoveForm(formId: string) {
    FormUtils.deleteFormData(this.context, formId);
  }
}