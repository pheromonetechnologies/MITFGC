import { EventForm } from "../event-form";

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Event</h1>
      <EventForm />
    </div>
  );
}
