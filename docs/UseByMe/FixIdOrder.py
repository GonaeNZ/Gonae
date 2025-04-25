import json
input_path  = 'e:/Git/God Knowledge/Gonae/docs/GodKnowledge/data/GodKnowledge.json'
output_path = 'e:/Git/God Knowledge/Gonae/docs/GodKnowledge/data/GodKnowledgeRenumbered.json'

# Load the JSON data
with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Renumber module IDs sequentially
for idx, module in enumerate(data['modules']):
    module['id'] = idx + 1

# Save the updated JSON
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Renumbered JSON saved to: {output_path}")
