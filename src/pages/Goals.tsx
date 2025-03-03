import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Target } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  description: string;
  category: string;
  progress: number;
  dueDate: string;
  milestones: { id: number; title: string; completed: boolean }[];
}

const Goals = () => {
  // Mock data
  const initialGoals: Goal[] = [
    {
      id: 1,
      title: 'Learn React',
      description: 'Master React and its ecosystem',
      category: 'Education',
      progress: 75,
      dueDate: '2025-06-30',
      milestones: [
        { id: 1, title: 'Complete basic tutorial', completed: true },
        { id: 2, title: 'Build a small project', completed: true },
        { id: 3, title: 'Learn hooks in depth', completed: false },
        { id: 4, title: 'Master context API', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Run 5K',
      description: 'Train for and complete a 5K run',
      category: 'Health',
      progress: 60,
      dueDate: '2025-05-15',
      milestones: [
        { id: 1, title: 'Run 1K without stopping', completed: true },
        { id: 2, title: 'Run 2K three times a week', completed: true },
        { id: 3, title: 'Run 3K without stopping', completed: false },
        { id: 4, title: 'Complete a 5K run', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Read 12 Books',
      description: 'Read one book per month for a year',
      category: 'Personal',
      progress: 25,
      dueDate: '2025-12-31',
      milestones: [
        { id: 1, title: 'Read 3 books', completed: true },
        { id: 2, title: 'Read 6 books', completed: false },
        { id: 3, title: 'Read 9 books', completed: false },
        { id: 4, title: 'Read 12 books', completed: false },
      ],
    },
  ];
  
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const categories = ['Education', 'Health', 'Career', 'Finance', 'Personal'];
  
  const handleAddGoal = () => {
    const newGoal: Goal = {
      id: goals.length + 1,
      title: 'New Goal',
      description: 'Goal description',
      category: 'Personal',
      progress: 0,
      dueDate: new Date().toISOString().split('T')[0],
      milestones: [],
    };
    
    setGoals([...goals, newGoal]);
    setIsAddDialogOpen(false);
  };
  
  const handleEditGoal = () => {
    if (selectedGoal) {
      setGoals(goals.map(goal => goal.id === selectedGoal.id ? selectedGoal : goal));
      setIsEditDialogOpen(false);
      setSelectedGoal(null);
    }
  };
  
  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };
  
  const handleMilestoneToggle = (goalId: number, milestoneId: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        
        // Calculate new progress
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const totalCount = updatedMilestones.length;
        const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress,
        };
      }
      return goal;
    }));
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
              <DialogDescription>
                Create a new goal to track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Goal title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Goal description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="Personal">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>Add Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {goal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Due: {goal.dueDate}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{goal.title}</DialogTitle>
                        <DialogDescription>{goal.description}</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline">{goal.category}</Badge>
                          <span className="text-sm text-muted-foreground">Due: {goal.dueDate}</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Milestones</h4>
                          {goal.milestones.map((milestone) => (
                            <div
                              key={milestone.id}
                              className="flex items-center space-x-2"
                              onClick={() => handleMilestoneToggle(goal.id, milestone.id)}
                            >
                              <div className={`h-4 w-4 rounded-sm border flex items-center justify-center cursor-pointer ${
                                milestone.completed ? 'bg-primary border-primary' : 'border-input'
                              }`}>
                                {milestone.completed && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3 text-primary-foreground"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {milestone.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedGoal(goal);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.filter(goal => goal.progress < 100).map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {goal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Due: {goal.dueDate}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.filter(goal => goal.progress === 100).map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {goal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Due: {goal.dueDate}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>
              Make changes to your goal.
            </DialogDescription>
          </DialogHeader>
          {selectedGoal && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={selectedGoal.title}
                  onChange={(e) => setSelectedGoal({ ...selectedGoal, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={selectedGoal.description}
                  onChange={(e) => setSelectedGoal({ ...selectedGoal, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={selectedGoal.category}
                  onValueChange={(value) => setSelectedGoal({ ...selectedGoal, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dueDate">Due Date</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={selectedGoal.dueDate}
                  onChange={(e) => setSelectedGoal({ ...selectedGoal, dueDate: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Goals;