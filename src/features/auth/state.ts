import TypeUtils from '../../utils/type-utils.ts';
import { User } from '../../types/user-types.ts';
import { AuthState } from './types';
import { getStorageItem } from '../../utils/storage-utils';
import { AuthFunctionality } from './enums.ts';

const initialState: AuthState = {
    user: getStorageItem<User>('user', 'object'),
    messages: TypeUtils.initRecord(Object.values(AuthFunctionality), null),
    statuses: TypeUtils.initRecord(Object.values(AuthFunctionality), null),
    severities: TypeUtils.initRecord(Object.values(AuthFunctionality), null)
}

export default initialState;