import Variable from '../interfaces/Variable';
import WFGetDictionaryValueType from '../interfaces/WF/WFGetDictionaryValueType';
import WFSerialization from '../interfaces/WF/WFSerialization';
import WFWorkflowAction from '../interfaces/WF/WFWorkflowAction';
import { withActionOutput } from '../utils';

/**
 * @action Get Dictionary Value
 * @section Actions > Scripting > Dictionaries
 * @icon Scripting
 *
 * Gets the value for the specified key in the dictionary passed into the action.
 *
 * ```js
 * getDictionaryValue({
 *   get: 'Value',
 *   key: 'My Key',
 *   from: myDictionaryVariable
 * });
 * ```
 */

const getDictionaryValue = (
  {
    key = '',
    get = 'Value',
    from,
  }: {
    /** The key of the dictionary to get */
    key?: string | WFSerialization,
    /** The thing to get */
    get?: WFGetDictionaryValueType,
    from?: Variable,
  },
): WFWorkflowAction => ({
  WFWorkflowActionIdentifier: 'is.workflow.actions.getvalueforkey',
  WFWorkflowActionParameters: {
    WFDictionaryKey: key,
    WFGetDictionaryValueType: get,
    ...(from && { WFInput: from }),
  },
});

export default withActionOutput(getDictionaryValue);
