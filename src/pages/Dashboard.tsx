import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CalendarDays, CheckCircle2, Clock, Target, Trophy, TrendingUp } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const goalData = [
  { name: "Completed", value: 8 },
  { name: "In Progress", value: 5 },
  { name: "Not Started", value: 3 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

const habitData = [
  { name: "Mon", completed: 5, total: 7 },
  { name: "Tue", completed: 7, total: 7 },
  { name: "Wed", completed: 6, total: 7 },
  { name: "Thu", completed: 4, total: 7 },
  { name: "Fri", completed: 7, total: 7 },
  { name: "Sat", completed: 3, total: 7 },
  { name: "Sun", completed: 5, total: 7 },
];


export default function Dashboard() {
  const { theme } = useTheme();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              50% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">
              Best: 21 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 new this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList className="space-x-1">
            <TabsTrigger value="goals" className={`text-primary ${theme === 'light' ? 'bg-white' : ''}`}>Goals</TabsTrigger>
            <TabsTrigger value="habits" className={`text-primary ${theme === 'light' ? 'bg-white' : ''}`}>Habits</TabsTrigger>
            <TabsTrigger value="tasks" className={`text-primary ${theme === 'light' ? 'bg-white' : ''}`}>Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
                <CardDescription>
                  Your goal completion status
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={goalData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {goalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">Completed</div>
                    <div className="text-lg font-bold">8</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">In Progress</div>
                    <div className="text-lg font-bold">5</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">Not Started</div>
                    <div className="text-lg font-bold">3</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1 row-span-2">
              <CardHeader>
                <CardTitle>Priority Goals</CardTitle>
                <CardDescription>
                  Your top priority goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Health</Badge>
                        <span className="font-medium">Run 5K</span>
                      </div>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Career</Badge>
                        <span className="font-medium">Learn React</span>
                      </div>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Finance</Badge>
                        <span className="font-medium">Save $5000</span>
                      </div>
                      <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Personal</Badge>
                        <span className="font-medium">Read 12 books</span>
                      </div>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>
                  Your latest milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Trophy className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Consistency Champion</p>
                      <p className="text-xs text-muted-foreground">Completed all habits for 7 days</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Goal Getter</p>
                      <p className="text-xs text-muted-foreground">Completed 5 goals this month</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Progress Master</p>
                      <p className="text-xs text-muted-foreground">Improved in all goal categories</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Habit Completion</CardTitle>
              <CardDescription>
                Your habit consistency over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={habitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="hsl(var(--chart-1))" name="Completed" />
                  <Bar dataKey="total" fill="hsl(var(--chart-2))" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Habits</CardTitle>
                <CardDescription>
                  Your most consistent habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Morning Meditation</span>
                    </div>
                    <Badge>98%</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Daily Reading</span>
                    </div>
                    <Badge>92%</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Workout</span>
                    </div>
                    <Badge>85%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Habits to Improve</CardTitle>
                <CardDescription>
                  Habits that need more consistency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Drink Water</span>
                    </div>
                    <Badge>45%</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Journal Writing</span>
                    </div>
                    <Badge>38%</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Early Sleep</span>
                    </div>
                    <Badge>30%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Tasks</CardTitle>
                  <CardDescription>
                    Your tasks for today
                  </CardDescription>
                </div>
               
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span className="line-through opacity-70">Complete project proposal</span>
                  <Badge variant="outline" className="ml-auto">Work</Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span className="line-through opacity-70">30 minutes workout</span>
                  <Badge variant="outline" className="ml-auto">Health</Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border"></div>
                  <span>Read 20 pages</span>
                  <Badge variant="outline" className="ml-auto">Personal</Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border"></div>
                  <span>Plan weekly meals</span>
                  <Badge variant="outline" className="ml-auto">Health</Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border"></div>
                  <span>Call mom</span>
                  <Badge variant="outline" className="ml-auto">Family</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>
                  Tasks due soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Submit tax documents</span>
                    <Badge variant="destructive">Tomorrow</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Finish presentation slides</span>
                    <Badge variant="secondary">2 days</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Book dentist appointment</span>
                    <Badge variant="outline">5 days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Task Completion</CardTitle>
                <CardDescription>
                  Your task completion rate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Today</span>
                    <span className="text-sm font-medium">2/5</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Week</span>
                    <span className="text-sm font-medium">15/20</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Month</span>
                    <span className="text-sm font-medium">42/50</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}