import Variable from '../interfaces/Variable';
import WFMathOperation from '../interfaces/WF/WFMathOperation';
import WFScientificMathOperation from '../interfaces/WF/WFScientificMathOperation';
import WFWorkflowAction from '../interfaces/WF/WFWorkflowAction';
import WFWorkflowActionParameters from '../interfaces/WF/WFWorkflowActionParameters';
import { withActionOutput } from '../utils';

/** @ignore */
const operationsMap = new Map([
  ['*', '×'],
  ['x', '×'],
  ['/', '÷'],
  ['sqrt', '√x'],
  ['cbrt', '∛x'],
]);

/**
 * @action Calculate
 * @section Actions > Scripting > Maths
 * @icon Calculator
 *
 * Performs a number operation on the input and returns the result.
 *
 * ```js
 * // Divide the input by 7
 * calculate({
 *   input: myNumberVariable,
 *   operand: 7,
 *   operation: '/',
 * });
 * ```
 */

const calculate = (
  {
    input,
    operand,
    operation = '+',
    scientificOperation,
  }: {
    /** The first number to perform the operation on */
    input?: number | Variable;
    /** A second number to perform the operation on */
    operand?: number | Variable;
    /**
     * The operation to apply to the number. Defaults to '+'
     * @default `+`
     **/
    operation?: (
      WFMathOperation
      | '*'
      | 'x'
      | '/'
    );
    /** The scientific operation to apply to the number */
    scientificOperation?: (
      WFScientificMathOperation
      | 'sqrt'
      | 'cbrt'
    );
  },
): WFWorkflowAction => {
  let parameters: WFWorkflowActionParameters;
  if (scientificOperation) {
    const ScientificMathOperation = operationsMap.get(scientificOperation) || scientificOperation;
    parameters = {
      ...(input !== undefined &&
        {
          WFInput: input instanceof Variable ? input : input,
        }),
      WFMathOperation: '…',
      ...(operand !== undefined &&
        {
          WFScientificMathOperand: operand instanceof Variable ? operand : operand,
        }),
      WFScientificMathOperation: ScientificMathOperation as WFScientificMathOperation,
    };
  } else {
    const MathOperation = (operationsMap.get(operation) || operation);
    parameters = {
      WFMathOperand: operand instanceof Variable ? operand : operand || 42,
      WFMathOperation: MathOperation as WFMathOperation,
    };
  }

  return {
    WFWorkflowActionIdentifier: 'is.workflow.actions.math',
    WFWorkflowActionParameters: parameters,
  };
};

export default withActionOutput(calculate);
