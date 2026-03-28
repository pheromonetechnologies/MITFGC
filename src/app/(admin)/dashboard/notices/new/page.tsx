import { NoticeForm } from "../notice-form";

export default function NewNoticePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Notice</h1>
      <NoticeForm />
    </div>
  );
}
