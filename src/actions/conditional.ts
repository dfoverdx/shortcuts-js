import * as uuidv4 from 'uuid/v4';
import Variable from '../interfaces/Variable';
import WFCondition from '../interfaces/WF/WFCondition';
import WFWorkflowAction from '../interfaces/WF/WFWorkflowAction';
import { withActionOutput } from '../utils';

/** @ignore */
const conditionMap = new Map([
  ['=', 'Equals'],
  ['<', 'Is Less Than'],
  ['>', 'Is Greater Than'],
  ['<=', 'Is Less Than or Equal To'],
  ['>=', 'Is Greater Than or Equal To'],
]);

/**
 * @action If
 * @section Actions > Scripting > Control Flow
 * @icon Scripting
 *
 * Tests if any item passed as input matches the specified condition, and if so, runs the actions inside. Otherwise, the actions under “Otherwise” are run.
 *
 * ```js
 * conditional({
 *   ifTrue: [
 *     comment({
 *       text: 'Do something when true',
 *     }),
 *   ],
 *   ifFalse: [
 *     comment({
 *       text: 'Do something different when false',
 *     }),
 *   ],
 *   test: '<',
 *   value: 27,
 * });
 * ```
 */

const conditional = (
  {
    input,
    ifTrue = [],
    ifFalse = [],
    test = 'Contains',
    value = 'example',
  }: {
    input?: Variable,
    /** An array of actions to perform if condition is true */
    ifTrue?: WFWorkflowAction[],
    /** An array of actions to perform if condition is false */
    ifFalse?: WFWorkflowAction[],
    /** The test to perform on the input */
    test?: (
      WFCondition
      | 'Contains'
      | '='
      | '<'
      | '>'
      | '<='
      | '>='
    ),
    /** The value to test the input against */
    value?: string | number | Variable,
  },
): WFWorkflowAction[] => {
  const groupingIdentifier = uuidv4();

  const ifAction: WFWorkflowAction = {
    WFWorkflowActionIdentifier: 'is.workflow.actions.conditional',
    WFWorkflowActionParameters: {
      GroupingIdentifier: groupingIdentifier,
      WFControlFlowMode: 0, // Start If
    },
  };

  if (input) {
    ifAction.WFWorkflowActionParameters.WFInput = input;
  }

  const inputIsString = test === 'Contains';

  if (test && !inputIsString) {
    const condition = (conditionMap.get(test) || test) as WFCondition;
    ifAction.WFWorkflowActionParameters.WFCondition = condition;
  }

  // Add correct property for string or number value
  if (value || value === 0) {
    if (!inputIsString) {
      ifAction.WFWorkflowActionParameters.WFNumberValue = value as number;
    } else {
      ifAction.WFWorkflowActionParameters.WFConditionalActionString = value as string;
    }
  }

  // Open the 'if' block and add ifTrue actions
  let actionArr: WFWorkflowAction[] = [
    ifAction,
    ...ifTrue,
  ];

  // If we've got some ifFalse actions, add an 'else' and append the ifFalse actions
  if (ifFalse.length > 0) {
    actionArr = [
      ...actionArr,
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.conditional',
        WFWorkflowActionParameters: {
          GroupingIdentifier: groupingIdentifier,
          WFControlFlowMode: 1, // Else
        },
      },
      ...ifFalse,
    ];
  }

  // Add the final action to close the 'if' block
  actionArr = [
    ...actionArr,
    {
      WFWorkflowActionIdentifier: 'is.workflow.actions.conditional',
      WFWorkflowActionParameters: {
        GroupingIdentifier: groupingIdentifier,
        WFControlFlowMode: 2, // End If
      },
    },
  ];

  return actionArr;
};

export default withActionOutput(conditional);
