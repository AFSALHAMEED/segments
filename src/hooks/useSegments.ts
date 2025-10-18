import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Schemas = {
  label: string;
  value: string;
};

type Props = {
  onClose: () => void;
  showPopup: boolean;
};

export const useSegments = ({ onClose, showPopup }: Props) => {
  const VITE_API_URL =
    import.meta.env.VITE_API_URL || "f7e95f29-f67b-4976-8746-5b78e7bab191";

  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const [segmentName, setSegmentName] = useState<string>("");
  const [schemas, setSchemas] = useState<[] | Schemas[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (showPopup) {
      setSchemas([]);
      setSegmentName("");
    }
  }, [showPopup]);

  const availableOptions = schemaOptions.filter(
    (opt) => !schemas.some((s) => s.value === opt.value)
  );

  const handleAddSchema = () => {
    setSchemas([
      ...schemas,
      { label: availableOptions[0].label, value: availableOptions[0].value },
    ]);
  };

  const handleSchemaChange = (index: number, newValue: string) => {
    const updated = [...schemas];
    const newOption = schemaOptions.find((s) => s.value === newValue);
    if (newOption) {
      updated[index] = newOption;
      setSchemas(updated);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!segmentName || schemas.length === 0) {
      toast.error("Please enter a segment name and add at least one schema.");
      return;
    }

    const payload = {
      segment_name: segmentName,
      schema: schemas.map((s) => ({ [s.value]: s.label })),
    };
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const webhookUrl = `https://webhook.site/${VITE_API_URL}`;
    const encodedUrl = encodeURIComponent(webhookUrl);
    try {
      const data = await axios.post(proxyUrl + encodedUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(data);
      toast.success("Segment saved successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send data.");
    } finally {
      setLoading(false);
    }
  };

  const onRemoveSegment = (value: string) => {
    setSchemas(() => schemas.filter((item) => item.value !== value));
  };

  return {
    segmentName,
    setSegmentName,
    handleSubmit,
    handleSchemaChange,
    handleAddSchema,
    schemas,
    setSchemas,
    schemaOptions,
    onRemoveSegment,
    loading,
    setLoading,
  };
};
