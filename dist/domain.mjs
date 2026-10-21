
export const STAGES=['Новый','Допечатная подготовка','Печать','Постпечатная обработка','Готов к выдаче','Выдан'];
export const PAYMENTS=['Не подтверждена','Не оплачен','Частично оплачен','Оплачен'];
export function canEditStage(role,order,userId='me'){return role==='manager'||(role==='executor'&&order?.executorId===userId)}
export function validateMessage(text,attachments=[]){const value=String(text??'').trim();if(!value&&!attachments.length)throw new Error('Напишите сообщение или добавьте файл');if(value.length>8000)throw new Error('Сообщение не должно превышать 8000 символов');return value}
export function setOrderStage(order,stage,role,userId='me'){if(!canEditStage(role,order,userId))throw new Error('Этап меняет назначенный исполнитель или менеджер');if(!STAGES.includes(stage))throw new Error('Неизвестный этап');return {...order,stage}}
export function setPayment(order,payment,role){if(role!=='manager')throw new Error('Оплату подтверждает менеджер');if(!PAYMENTS.includes(payment))throw new Error('Неизвестный статус оплаты');return {...order,payment}}
export function formatBytes(bytes){return bytes<1024?bytes+' Б':bytes<1048576?Math.round(bytes/1024)+' КБ':(bytes/1048576).toFixed(1)+' МБ'}
