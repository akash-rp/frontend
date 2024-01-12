import {h} from 'vue';
export function ModalWrapper({title, component, componentProps, modal}) {
    return modal.info({
        title: title,
        closable: true,
        icon: null,
        footer:null,
        content: h(component,{data: componentProps})
    });
}
