## Define the unit of replay

Choose whether the operation reprocesses an original event or reruns a specific delivery attempt. An event can fan out to several channels, so the choice determines the scope of downstream effects.

## Separate inspection from execution

Start with a dry run that shows the selected event, destination, and likely effects. Require explicit authorization for execution, and give each approved run a stable identifier so retries can be deduplicated.

## Measure the workflow

Track replay counts, duplicate suppression, and denied actions. Exercise replay against a sink populated with synthetic events before testing any production delivery path.
