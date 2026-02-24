import { useContext } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Check, Trash2, Plus } from "lucide-react";
import { StoreContext } from "../store/StoreContext/StoreContext";

export function TaskListPage() {
  const { state, dispatch } = useContext(StoreContext);
  const navigate = useNavigate();
  const activeTasks = state.todos.filter((task) => !task.completed).length;
  const completedTasks = state.todos.filter((task) => task.completed).length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Tarefas</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              {activeTasks} ativas, {completedTasks} concluídas
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/create")} className=" flex items-center gap-2">
            <Plus className="size-4 mr-2" />
            Nova Tarefa
          </Button>
        </CardHeader>
        <CardContent>
          {state.todos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhuma tarefa criada ainda.</p>
              <p className="text-sm mt-2">Clique em "Nova Tarefa" para começar!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.todos.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        <Badge variant={task.completed ? "secondary" : "default"}>
                          {task.completed ? "Concluída" : "Ativa"}
                        </Badge>
                      </div>
                      {task.description && (
                        <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!task.completed && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            dispatch({ type: "TOGGLE_TODO", payload: { id: task.id } })
                          }
                        >
                          <Check className="size-4 mr-2" />
                          Concluir
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          dispatch({ type: "DELETE_TODO", payload: { id: task.id } })
                        }
                      >
                        <Trash2 className="size-4" />
                        Deletar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} // A função TaskListPage agora inclui um botão "Nova Tarefa" que chama a função onCreateNew passada como prop.
