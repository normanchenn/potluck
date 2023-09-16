category_dict = {}

with open('category.txt', 'r') as file:
    next(file)  # Skip the header line
    for line in file:
        id_str, name = line.strip().split('\t')
        category_dict[int(id_str)] = name

print(category_dict)