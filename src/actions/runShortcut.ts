import Variable from '../interfaces/Variable';
import WFWorkflowAction from '../interfaces/WF/WFWorkflowAction';
import { withActionOutput } from '../utils';

/**
 * @action Run Shortcut
 * @section Actions > Scripting > Shortcuts
 * @icon Shortcuts
 *
 * Run a shortcut from your shortcut.
 *
 * ```js
 * runShortcut({
 *   name: 'My Great Shortcut',
 *   show: true,
 * });
 * ```
 */

const runShortcut = (
  {
    name,
    show = false,
    input,
  }: {
    /** The name of the shortcut to run */
    name: string,
    /** Whether to show the shortcut while it runs */
    show?: boolean,
    /** Value to pass in as Shortcut Input */
    input?: Variable,
  },
): WFWorkflowAction => ({
  WFWorkflowActionIdentifier: 'is.workflow.actions.runworkflow',
  WFWorkflowActionParameters: {
    WFWorkflowName: name,
    WFShowWorkflow: show,
    ...(input !== undefined && { WFInput: input }),
  },
});

export default withActionOutput(runShortcut);
