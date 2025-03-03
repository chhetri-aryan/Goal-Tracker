import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const Reports = () => {
  // Mock data for charts
  const goalProgressData = [
    { name: 'Learn React', value: 75 },
    { name: 'Run 5K', value: 60 },
    { name: 'Read 12 Books', value: 25 },
    { name: 'Learn Piano', value: 40 },
    { name: 'Save $5000', value: 30 },
  ];
  
  const taskCompletionData = [
    { name: 'Mon', completed: 5, total: 8 },
    { name: 'Tue', completed: 7, total: 9 },
    { name: 'Wed', completed: 4, total: 6 },
    { name: 'Thu', completed: 6, total: 7 },
    { name: 'Fri', completed: 8, total: 10 },
    { name: 'Sat', completed: 3, total: 5 },
    { name: 'Sun', completed: 2, total: 4 },
  ];
  
  const habitStreakData = [
    { name: 'Drink water', streak: 7 },
    { name: 'Meditate', streak: 5 },
    { name: 'Exercise', streak: 3 },
    { name: 'Read', streak: 12 },
    { name: 'Journal', streak: 8 },
  ];
  
  const categoryDistributionData = [
    { name: 'Health', value: 35 },
    { name: 'Education', value: 25 },
    { name: 'Career', value: 20 },
    { name: 'Personal', value: 15 },
    { name: 'Finance', value: 5 },
  ];
  
  const weeklyProgressData = [
    { name: 'Week 1', progress: 45 },
    { name: 'Week 2', progress: 52 },
    { name: 'Week 3', progress: 49 },
    { name: 'Week 4', progress: 65 },
    { name: 'Week 5', progress: 59 },
    { name: 'Week 6', progress: 70 },
    { name: 'Week 7', progress: 75 },
    { name: 'Week 8', progress: 68 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports & Insights</h2>
          <p className="text-muted-foreground">
            Analyze your progress and identify patterns.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2 col-span-1">
            <Label htmlFor="timeframe">Timeframe</Label>
            <Select defaultValue="month">
              <SelectTrigger id="timeframe">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="habits">Habits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
                <CardDescription>Average completion across all goals</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={goalProgressData}
                  index="name"
                  categories={["value"]}
                  valueFormatter={(value) => `${value}%`}
                  colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]}
                  className="aspect-square"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Progress trend over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={weeklyProgressData}
                  index="name"
                  categories={["progress"]}
                  colors={["hsl(var(--chart-1))"]}
                  valueFormatter={(value) => `${value}%`}
                  className="aspect-square"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Goals by category</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={categoryDistributionData}
                  index="name"
                  categories={["value"]}
                  valueFormatter={(value) => `${value}%`}
                  colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]}
                  className="aspect-square"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Rate</CardTitle>
              <CardDescription>Daily task completion for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={taskCompletionData}
                index="name"
                categories={["completed", "total"]}
                colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
                valueFormatter={(value) => `${value} tasks`}
                className="aspect-[2/1]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goal Progress</CardTitle>
              <CardDescription>Detailed view of each goal's progress</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={goalProgressData}
                index="name"
                categories={["value"]}
                colors={["hsl(var(--chart-1))"]}
                valueFormatter={(value) => `${value}%`}
                className="aspect-[2/1]"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Goals by category</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                data={categoryDistributionData}
                index="name"
                categories={["value"]}
                valueFormatter={(value) => `${value}%`}
                colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]}
                className="aspect-[2/1]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Rate</CardTitle>
              <CardDescription>Daily task completion for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={taskCompletionData}
                index="name"
                categories={["completed", "total"]}
                colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
                valueFormatter={(value) => `${value} tasks`}
                className="aspect-[2/1]"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Task Trend</CardTitle>
              <CardDescription>Task completion trend over time</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={weeklyProgressData}
                index="name"
                categories={["progress"]}
                colors={["hsl(var(--chart-1))"]}
                valueFormatter={(value) => `${value}%`}
                className="aspect-[2/1]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Habit Streaks</CardTitle>
              <CardDescription>Current streak for each habit</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={habitStreakData}
                index="name"
                categories={["streak"]}
                colors={["hsl(var(--chart-1))"]}
                valueFormatter={(value) => `${value} days`}
                className="aspect-[2/1]"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Habit Consistency</CardTitle>
              <CardDescription>Percentage of days with completed habits</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                data={[
                  { name: 'Completed', value: 75 },
                  { name: 'Missed', value: 25 },
                ]}
                index="name"
                categories={["value"]}
                valueFormatter={(value) => `${value}%`}
                colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
                className="aspect-[2/1]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;