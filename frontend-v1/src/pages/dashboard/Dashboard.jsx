import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">CRM</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* All Calls Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">100</p>
          </CardContent>
        </Card>

        {/* Missed Calls Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">15</p>
          </CardContent>
        </Card>

        {/* Call Log Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">50</p>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-2xl font-bold">Calls</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Incoming Calls Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>Incoming Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">50</p>
          </CardContent>
        </Card>

        {/* Outgoing Calls Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>Outgoing Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">35</p>
          </CardContent>
        </Card>

        {/* Voicemail Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>Voicemails</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">5</p>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-2xl font-bold">SMS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Incoming Calls Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>Sender Id</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">50</p>
          </CardContent>
        </Card>

        {/* Outgoing Calls Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>SMS Template</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">35</p>
          </CardContent>
        </Card>

        {/* Voicemail Card */}
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>SMS Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">5</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
