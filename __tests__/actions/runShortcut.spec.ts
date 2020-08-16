import { variable } from '../../src';
import { runShortcut } from '../../src/actions';

describe('runShortcut function', () => {

  it('is a function', () => {
    expect(typeof runShortcut).toBe('function');
  });

  it('builds a runShortcut action when a name is passed', () => {
    const name = 'Some Shortcut';
    const expected = {
      WFWorkflowActionIdentifier: 'is.workflow.actions.runworkflow',
      WFWorkflowActionParameters: {
        WFWorkflowName: name,
        WFShowWorkflow: false,
      },
    };
    const actual = runShortcut({
      name,
    });

    expect(actual).toEqual(expected);
  });

  it('builds a runShortcut action when name and show are passed', () => {
    const name = 'Some Shortcut';
    const show = true;
    const expected = {
      WFWorkflowActionIdentifier: 'is.workflow.actions.runworkflow',
      WFWorkflowActionParameters: {
        WFWorkflowName: name,
        WFShowWorkflow: show,
      },
    };
    const actual = runShortcut({
      name,
      show,
    });

    expect(actual).toEqual(expected);
  });

  it('builds a runShortcut action when name and input are passed', () => {
    const name = 'Some Shortcut';
    const input = variable('some var');
    const expected = {
      WFWorkflowActionIdentifier: 'is.workflow.actions.runworkflow',
      WFWorkflowActionParameters: {
        WFWorkflowName: name,
        WFShowWorkflow: false,
        WFInput: input,
      },
    };
    const actual = runShortcut({
      name,
      input,
    });

    expect(actual).toEqual(expected);
  });
});
