<?php

namespace App\Repositories;

use App\Repositories\Interfaces\IRepository;

class FileRepository implements IRepository
{
    private string $filePath;
    private array $data = [];

    public function __construct(string $filename)
    {
        $this->filePath = storage_path('data/' . $filename);
        $this->loadFromCsv();
    }

    public function getAll(): array
    {
        return $this->data;
    }

    public function getById(int $id): ?array
    {
        foreach ($this->data as $row) {
            if ((int)$row['id'] === $id) return $row;
        }
        return null;
    }

    public function add(array $data): bool
    {
        $this->data[] = $data;
        return true;
    }

    public function save(): bool
    {
        if (empty($this->data)) return false;
        $file = fopen($this->filePath, 'w');
        fputcsv($file, array_keys($this->data[0]));
        foreach ($this->data as $row) {
            fputcsv($file, $row);
        }
        fclose($file);
        return true;
    }

    private function loadFromCsv(): void
    {
        if (!file_exists($this->filePath)) return;
        $file = fopen($this->filePath, 'r');
        $headers = fgetcsv($file);
        while (($row = fgetcsv($file)) !== false) {
            $this->data[] = array_combine($headers, $row);
        }
        fclose($file);
    }
}