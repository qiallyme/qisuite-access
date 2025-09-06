import { useState } from "react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { supabase } from "../../lib/supabaseClient";

export default function ClientUpdate() {
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    setStatus(null);
    const { error } = await supabase.from("client_updates").insert({
      company,
      notes,
    });
    setLoading(false);
    if (error) setStatus(error.message);
    else setStatus("Saved");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Client Update</h1>
      <div className="grid gap-4 max-w-lg">
        <div>
          <Label>Company</Label>
          <Input value={company} onChange={(e) => setCompany(String(e.target.value))} />
        </div>
        <div>
          <Label>Notes</Label>
          <Input
            value={notes}
            onChange={(e) => setNotes(String(e.target.value))}
            className="h-24"
          />
        </div>
        <div>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
        {status && <div className="text-sm text-gray-500">{status}</div>}
      </div>
    </div>
  );
}


