import { Integration, Step } from '@syndesis/models';
import resolvers from '../resolvers';

export function getCreateAddConnectionHref(
  integration: Integration,
  position: string
) {
  return resolvers.create.configure.addConnection.selectConnection({
    integration,
    position,
  });
}

export function getCreateAddStepHref(
  integration: Integration,
  position: string
) {
  return resolvers.create.configure.addStep.selectStep({
    integration,
    position,
  });
}

export function getCreateConfigureConnectionHrefCallback(
  integration: Integration
) {
  return (stepIdx: number, step: Step) =>
    resolvers.create.configure.editConnection.configureAction({
      actionId: step.action!.id!,
      integration,
      position: `${stepIdx}`,
    });
}

export function getCreateConfigureStepHrefCallback(integration: Integration) {
  return (stepIdx: number, step: Step) => 'TODO';
}

export function getEditAddConnectionHref(
  integration: Integration,
  position: string
) {
  return resolvers.integration.edit.addConnection.selectConnection({
    integration,
    position,
  });
}

export function getEditAddStepHref(integration: Integration, position: string) {
  return resolvers.integration.edit.addStep.selectStep({
    integration,
    position,
  });
}

export function getEditConfigureConnectionHrefCallback(
  integration: Integration
) {
  return (stepIdx: number, step: Step) =>
    resolvers.integration.edit.editConnection.configureAction({
      actionId: step.action!.id!,
      integration,
      position: `${stepIdx}`,
    });
}

export function getEditConfigureStepHrefCallback(integration: Integration) {
  return (stepIdx: number, step: Step) => 'TODO';
}
