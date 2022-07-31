import './index.scss';

import { KeyboardEvent, ReactElement } from 'react';

import useKeyStroke from 'hooks/useKeyStroke';
import { TaskProvider } from 'providers/task';
import { useTasks } from 'providers/tasks';
import EditTaskCard from 'routes/tasks/components/task/edit';
import { HOT_KEYS } from 'settings';

const { CLOSE_ACTIVE_TASK_KEY } = HOT_KEYS;

const WorkspacePanel = (): ReactElement => {
  const { activeTaskId, tasks, updateActiveTaskId } = useTasks();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case CLOSE_ACTIVE_TASK_KEY:
        if (activeTaskId) updateActiveTaskId(undefined);
        break;
    }
  };

  useKeyStroke([{ shiftKey: true, key: CLOSE_ACTIVE_TASK_KEY }], handleKeyStrokes);

  if (!activeTaskId) return null;
  const activeTask = tasks.find(x => x.id === activeTaskId);

  return (
    <div className='tm-panel' id='task-workspace-panel'>
      <TaskProvider task={{...activeTask}}>
        <EditTaskCard />
      </TaskProvider>
    </div>
  );
};

export default WorkspacePanel;
