import json
from typing import Any

def reformat_references(obj: Any) -> None:
    """
    Recursively walk through obj (dicts/lists). Whenever
    you find a key "references" whose value is a list of dicts
    with an 'eng' key, replace that list with a list of the
    eng-strings.
    """
    if isinstance(obj, dict):
        for key, val in list(obj.items()):
            if key == "references" and isinstance(val, list):
                # Extract the canonical English strings
                obj[key] = [ref.get("eng", "").strip() for ref in val]
            else:
                reformat_references(val)
    elif isinstance(obj, list):
        for item in obj:
            reformat_references(item)

# ——— USAGE EXAMPLE ———
input_path  = 'e:/Git/God Knowledge/Gonae/docs/GodKnowledge/data/GodKnowledge.json'
output_path = 'e:/Git/God Knowledge/Gonae/docs/GodKnowledge/data/GodKnowledgeRef.json'

with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

reformat_references(data)

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✔ Wrote simplified references to {output_path}")
