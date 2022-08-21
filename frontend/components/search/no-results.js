import { Combobox } from "@headlessui/react";

export default function NoResults() {
  return (
    <Combobox.Options static className="mb-3 text-xl search-input-option">
      <Combobox.Option disabled>
        <span className="px-2 m-3">No results found</span>
      </Combobox.Option>
    </Combobox.Options>
  );
}
