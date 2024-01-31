import FormExtensionAbility from '@ohos:app.form.FormExtensionAbility';
import formBindingData from '@ohos:app.form.formBindingData';
import FormUtils from '@bundle:com.example.healthy_life/entry/ets/common/utils/FormUtils';
import { FORM_PARAM_IDENTITY_KEY, FORM_PARAM_DIMENSION_KEY, FORM_PARAM_NAME_KEY, } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export default class EntryFormAbility extends FormExtensionAbility {
    onAddForm(want) {
        let formId = want.parameters[FORM_PARAM_IDENTITY_KEY];
        let formName = want.parameters[FORM_PARAM_NAME_KEY];
        let formDimension = want.parameters[FORM_PARAM_DIMENSION_KEY];
        let formInfo = {
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
    onRemoveForm(formId) {
        FormUtils.deleteFormData(this.context, formId);
    }
}
//# sourceMappingURL=EntryFormAbility.js.map