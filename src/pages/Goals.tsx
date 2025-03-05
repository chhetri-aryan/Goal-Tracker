import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addMonths } from "date-fns";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  CheckCircle2,
  Edit,
  Plus,
  Trash2,
  Target,
  Calendar as CalendarIcon2,
  Flag,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for goals
const mockGoals = [
  {
    id: 1,
    title: "Run 5K",
    description: "Train and complete a 5K run",
    category: "Health",
    targetDate: addMonths(new Date(), 1),
    progress: 75,
    milestones: [
      { id: 1, title: "Run 1K without stopping", completed: true },
      { id: 2, title: "Run 2K without stopping", completed: true },
      { id: 3, title: "Run 3K without stopping", completed: true },
      { id: 4, title: "Run 4K without stopping", completed: false },
      { id: 5, title: "Complete 5K run", completed: false },
    ],
    priority: "high",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Learn React",
    description: "Complete React course and build a project",
    category: "Career",
    targetDate: addMonths(new Date(), 2),
    progress: 60,
    milestones: [
      { id: 1, title: "Complete basic tutorials", completed: true },
      { id: 2, title: "Learn hooks and state management", completed: true },
      { id: 3, title: "Build a small application", completed: false },
      { id: 4, title: "Learn advanced patterns", completed: false },
      { id: 5, title: "Deploy a production app", completed: false },
    ],
    priority: "high",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Save $5000",
    description: "Save money for emergency fund",
    category: "Finance",
    targetDate: addMonths(new Date(), 6),
    progress: 40,
    milestones: [
      { id: 1, title: "Save $1000", completed: true },
      { id: 2, title: "Save $2000", completed: true },
      { id: 3, title: "Save $3000", completed: false },
      { id: 4, title: "Save $4000", completed: false },
      { id: 5, title: "Save $5000", completed: false },
    ],
    priority: "medium",
    status: "in-progress",
  },
  {
    id: 4,
    title: "Read 12 books",
    description: "Read one book per month for a year",
    category: "Personal",
    targetDate: addMonths(new Date(), 12),
    progress: 25,
    milestones: [
      { id: 1, title: "Read 3 books", completed: true },
      { id: 2, title: "Read 6 books", completed: false },
      { id: 3, title: "Read 9 books", completed: false },
      { id: 4, title: "Read 12 books", completed: false },
    ],
    priority: "medium",
    status: "in-progress",
  },
  {
    id: 5,
    title: "Learn Spanish",
    description: "Achieve conversational fluency in Spanish",
    category: "Education",
    targetDate: addMonths(new Date(), 8),
    progress: 15,
    milestones: [
      { id: 1, title: "Learn basic vocabulary", completed: true },
      { id: 2, title: "Complete beginner course", completed: false },
      { id: 3, title: "Have basic conversations", completed: false },
      { id: 4, title: "Reach intermediate level", completed: false },
      { id: 5, title: "Achieve conversational fluency", completed: false },
    ],
    priority: "low",
    status: "in-progress",
  },
  {
    id: 6,
    title: "Declutter Home",
    description: "Organize and minimize possessions",
    category: "Personal",
    targetDate: addMonths(new Date(), 1),
    progress: 50,
    milestones: [
      { id: 1, title: "Declutter bedroom", completed: true },
      { id: 2, title: "Organize kitchen", completed: true },
      { id: 3, title: "Clean out garage", completed: false },
      { id: 4, title: "Minimize digital files", completed: false },
    ],
    priority: "medium",
    status: "in-progress",
  },
  {
    id: 7,
    title: "Meditate Daily",
    description: "Establish a consistent meditation practice",
    category: "Wellness",
    targetDate: addMonths(new Date(), 3),
    progress: 100,
    milestones: [
      { id: 1, title: "Meditate 5 minutes daily", completed: true },
      { id: 2, title: "Increase to 10 minutes", completed: true },
      { id: 3, title: "Practice for 30 days straight", completed: true },
      { id: 4, title: "Reach 15 minutes daily", completed: true },
    ],
    priority: "high",
    status: "completed",
  },
  {
    id: 8,
    title: "Get Promotion",
    description: "Achieve next career level",
    category: "Career",
    targetDate: addMonths(new Date(), 6),
    progress: 0,
    milestones: [
      { id: 1, title: "Update resume and skills", completed: false },
      { id: 2, title: "Complete key project", completed: false },
      { id: 3, title: "Request performance review", completed: false },
      { id: 4, title: "Apply for promotion", completed: false },
    ],
    priority: "high",
    status: "not-started",
  },
];

export default function Goals() {
  const [goals, setGoals] = useState(mockGoals);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    targetDate: new Date(),
    priority: "medium",
    status: "not-started",
  });
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();
  const [selectedGoal, setSelectedGoal] = useState<
    (typeof mockGoals)[0] | null
  >(null);
  const [isViewGoalOpen, setIsViewGoalOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState("");

  const [isEditMilestoneOpen, setIsEditMilestoneOpen] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<number | null>(
    null
  );
  const [updatedMilestoneTitle, setUpdatedMilestoneTitle] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedGoal) {
      const updatedGoal = goals.find((goal) => goal.id === selectedGoal.id);
      if (updatedGoal) setSelectedGoal(updatedGoal);
    }
  }, [goals]);

  const handleEditMilestone = (goalId: number, milestoneId: number) => {
    const goal = goals.find((g) => g.id === goalId);
    const milestone = goal?.milestones.find((m) => m.id === milestoneId);

    if (milestone) {
      setSelectedGoalId(goalId);
      setEditingMilestoneId(milestoneId);
      setUpdatedMilestoneTitle(milestone.title);
      setIsEditMilestoneOpen(true);
    }
  };

  const saveUpdatedMilestone = () => {
    if (!editingMilestoneId || !selectedGoalId) return;

    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === selectedGoalId
          ? {
              ...goal,
              milestones: goal.milestones.map((m) =>
                m.id === editingMilestoneId
                  ? { ...m, title: updatedMilestoneTitle }
                  : m
              ),
            }
          : goal
      )
    );

    setIsEditMilestoneOpen(false);
    setEditingMilestoneId(null);
    setUpdatedMilestoneTitle("");
  };

  const handleAddGoal = () => {
    if (!newGoal.title) {
      toast({
        title: "Goal title is required",
        description: "Please enter a title for your goal",
        variant: "destructive",
      });
      return;
    }

    const goal = {
      id: goals.length + 1,
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category || "Personal",
      targetDate: date || addMonths(new Date(), 1),
      progress: 0,
      milestones: [],
      priority: newGoal.priority,
      status: "not-started",
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: "",
      description: "",
      category: "",
      targetDate: new Date(),
      priority: "medium",
      status: "not-started",
    });
    setDate(undefined);
    setIsAddGoalOpen(false);

    toast({
      title: "Goal added",
      description: "Your goal has been added successfully",
    });
  };

  const deleteGoal = (id: number) => {
    const goal = goals.find((g) => g.id === id);
    setGoals(goals.filter((goal) => goal.id !== id));

    if (goal) {
      toast({
        title: "Goal deleted",
        description: goal.title,
      });
    }
  };

  const editGoal = (id: number) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      setNewGoal({
        title: goal.title,
        description: goal.description,
        category: goal.category,
        targetDate: goal.targetDate,
        priority: goal.priority,
        status: goal.status,
      });
      setDate(goal.targetDate);
      setIsAddGoalOpen(true);
    }
  };

  const viewGoalDetails = (id: number) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      setSelectedGoal(goal);
      setIsViewGoalOpen(true);
    }
  };

  const toggleMilestoneCompletion = (goalId: number, milestoneId: number) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map((milestone) => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });

        // Calculate new progress
        const completedCount = updatedMilestones.filter(
          (m) => m.completed
        ).length;
        const totalCount = updatedMilestones.length;
        const newProgress = Math.round((completedCount / totalCount) * 100);

        // Update status if needed
        let newStatus = goal.status;
        if (newProgress === 100) {
          newStatus = "completed";
        } else if (newProgress > 0) {
          newStatus = "in-progress";
        }

        return {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress,
          status: newStatus,
        };
      }
      return goal;
    });

    setGoals(updatedGoals);

    // Also update the selected goal if it's the one being modified
    if (selectedGoal && selectedGoal.id === goalId) {
      const updatedGoal = updatedGoals.find((g) => g.id === goalId);
      if (updatedGoal) {
        setSelectedGoal(updatedGoal);
      }
    }
  };

  const addMilestone = () => {
    if (!selectedGoal || !newMilestone) return;

    const updatedGoal = {
      ...selectedGoal,
      milestones: [
        ...selectedGoal.milestones,
        {
          id: selectedGoal.milestones.length + 1,
          title: newMilestone,
          completed: false,
        },
      ],
    };

    setGoals(
      goals.map((goal) => (goal.id === selectedGoal.id ? updatedGoal : goal))
    );
    setSelectedGoal(updatedGoal);
    setNewMilestone("");

    toast({
      title: "Milestone added",
      description: "New milestone has been added to your goal",
    });
  };

  const deleteMilestone = (goalId: number, milestoneId: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.filter(
            (milestone) => milestone.id !== milestoneId
          );
          return { ...goal, milestones: updatedMilestones };
        }
        return goal;
      })
    );

    if (selectedGoal && selectedGoal.id === goalId) {
      const updatedGoal = {
        ...selectedGoal,
        milestones: selectedGoal.milestones.filter(
          (milestone) => milestone.id !== milestoneId
        ),
      };
      setSelectedGoal(updatedGoal);
    }
  };

  const filteredGoals = goals.filter((goal) => {
    if (filter === "all") return true;
    if (filter === "in-progress") return goal.status === "in-progress";
    if (filter === "completed") return goal.status === "completed";
    if (filter === "not-started") return goal.status === "not-started";
    if (filter === "high-priority") return goal.priority === "high";
    if (filter === "health") return goal.category === "Health";
    if (filter === "career") return goal.category === "Career";
    if (filter === "personal") return goal.category === "Personal";
    if (filter === "finance") return goal.category === "Finance";
    return true;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Health":
        return "bg-blue-500/10 text-blue-500";
      case "Career":
        return "bg-purple-500/10 text-purple-500";
      case "Finance":
        return "bg-green-500/10 text-green-500";
      case "Personal":
        return "bg-orange-500/10 text-orange-500";
      case "Education":
        return "bg-yellow-500/10 text-yellow-500";
      case "Wellness":
        return "bg-teal-500/10 text-teal-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "in-progress":
        return "bg-blue-500/10 text-blue-500";
      case "not-started":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Goals</h2>
          <p className="text-muted-foreground">
            Set, track, and achieve your personal goals.
          </p>
        </div>
        <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
              <DialogDescription>
                Create a new goal to track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                  placeholder="Enter goal title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                  placeholder="Enter goal description"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Wellness">Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  defaultValue="medium"
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>Add Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setFilter}>
        <TabsList className="space-x-1">
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
          <TabsTrigger value="high-priority">High Priority</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredGoals.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Target className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No goals found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {filter === "completed"
                    ? "You haven't completed any goals yet."
                    : filter === "not-started"
                    ? "You don't have any goals waiting to be started."
                    : "Add a new goal to get started."}
                </p>
                <Button className="mt-4" onClick={() => setIsAddGoalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Goal
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredGoals.map((goal) => (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge
                        className={cn("mb-2", getCategoryColor(goal.category))}
                      >
                        {goal.category}
                      </Badge>
                      <CardTitle className="line-clamp-1">
                        {goal.title}
                      </CardTitle>
                    </div>
                    <Badge variant={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {goal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CalendarIcon2 className="h-3 w-3" />
                        <span>
                          Target: {format(goal.targetDate, "MMM d, yyyy")}
                        </span>
                      </div>
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status === "in-progress"
                          ? "In Progress"
                          : goal.status === "not-started"
                          ? "Not Started"
                          : "Completed"}
                      </Badge>
                    </div>

                    {goal.milestones.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-xs font-medium">
                          Key Milestones:
                        </span>
                        <ul className="space-y-1 text-xs">
                          {goal.milestones.slice(0, 2).map((milestone) => (
                            <li
                              key={milestone.id}
                              className="flex items-center gap-1"
                            >
                              {milestone.completed ? (
                                <CheckCircle2 className="h-3 w-3 text-primary" />
                              ) : (
                                <div className="h-3 w-3 rounded-full border" />
                              )}
                              <span
                                className={
                                  milestone.completed
                                    ? "text-muted-foreground line-through"
                                    : ""
                                }
                              >
                                {milestone.title}
                              </span>
                            </li>
                          ))}
                          {goal.milestones.length > 2 && (
                            <li className="text-muted-foreground">
                              +{goal.milestones.length - 2} more milestones
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewGoalDetails(goal.id)}
                  >
                    View Details
                  </Button>
                  <div className="flex gap-1">
                    <Button variant="ghost" onClick={() => editGoal(goal.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => deleteGoal(goal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </Tabs>

      {/* Goal Details Dialog */}
      <Dialog open={isViewGoalOpen} onOpenChange={setIsViewGoalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedGoal && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={getCategoryColor(selectedGoal.category)}>
                      {selectedGoal.category}
                    </Badge>
                    <DialogTitle className="mt-2">
                      {selectedGoal.title}
                    </DialogTitle>
                  </div>
                  <Badge
                    className="mt-10"
                    variant={getPriorityColor(selectedGoal.priority)}
                  >
                    {selectedGoal.priority}
                  </Badge>
                </div>
                <DialogDescription>
                  {selectedGoal.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Progress</h4>
                    <span className="text-sm font-medium">
                      {selectedGoal.progress}%
                    </span>
                  </div>
                  <Progress value={selectedGoal.progress} className="h-2" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Target Date</p>
                        <p className="text-sm text-muted-foreground">
                          {format(selectedGoal.targetDate, "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <Badge className={getStatusColor(selectedGoal.status)}>
                          {selectedGoal.status === "in-progress"
                            ? "In Progress"
                            : selectedGoal.status === "not-started"
                            ? "Not Started"
                            : "Completed"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-medium">Milestones</h4>
                  {selectedGoal.milestones.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No milestones added yet.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedGoal.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="flex items-center gap-2 justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={milestone.completed}
                              onCheckedChange={() =>
                                toggleMilestoneCompletion(
                                  selectedGoal.id,
                                  milestone.id
                                )
                              }
                            />
                            <span
                              className={cn(
                                milestone.completed &&
                                  "line-through text-muted-foreground"
                              )}
                            >
                              {milestone.title}
                            </span>
                          </div>

                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleEditMilestone(
                                  selectedGoal.id,
                                  milestone.id
                                )
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                deleteMilestone(selectedGoal.id, milestone.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Input
                      placeholder="Add a new milestone"
                      value={newMilestone}
                      onChange={(e) => setNewMilestone(e.target.value)}
                    />
                    <Button onClick={addMilestone} disabled={!newMilestone}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsViewGoalOpen(false)}
                >
                  Close
                </Button>
                <Button onClick={() => editGoal(selectedGoal.id)}>
                  Edit Goal
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Milestone update Dialog */}
      <Dialog open={isEditMilestoneOpen} onOpenChange={setIsEditMilestoneOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Milestone</DialogTitle>
            <DialogDescription>
              Update the milestone title below.
            </DialogDescription>
          </DialogHeader>

          <Input
            value={updatedMilestoneTitle}
            onChange={(e) => setUpdatedMilestoneTitle(e.target.value)}
            placeholder="Enter milestone title"
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditMilestoneOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={saveUpdatedMilestone}
              disabled={!updatedMilestoneTitle.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete milestone dialog */}
    </div>
  );
}
