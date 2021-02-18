import * as yup from 'yup';
export const videoDownloadValidation = yup.object().shape({
    link: yup.string().required().url(),
    format: yup.string().required()
})