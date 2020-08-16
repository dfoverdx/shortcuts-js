import Variable from '../interfaces/Variable';
import WFSerialization from '../interfaces/WF/WFSerialization';
import WFWorkflowAction from '../interfaces/WF/WFWorkflowAction';
import { withActionOutput } from '../utils';

/**
 * @action Set Dictionary Value
 * @section Actions > Scripting > Dictionaries
 * @icon Scripting
 *
 * Sets a value in the dictionary passed into the action.
 *
 * ```js
 * setDictionaryValue({
 *   key: 'testKey',
 *   value: 'testValue',
 *   inDict: myDictionaryVariable,
 * });
 * ```
 */

const setDictionaryValue = (
  {
    key = '',
    value = '',
    inDict,
  }: {
    /** The key to set */
    key?: string | WFSerialization,
    /** The value to set */
    value?: string | number | WFSerialization,
    inDict?: Variable,
  },
): WFWorkflowAction => ({
  WFWorkflowActionIdentifier: 'is.workflow.actions.setvalueforkey',
  WFWorkflowActionParameters: {
    WFDictionaryKey: key,
    WFDictionaryValue: value,
    ...(inDict && { WFDictionary: inDict }),
  },
});

export default withActionOutput(setDictionaryValue);
