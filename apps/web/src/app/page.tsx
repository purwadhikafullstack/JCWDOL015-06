import { Input, Button } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="p-4">
      <Button>Test Button</Button>
      <Input isClearable label="Product Name" fullWidth />
    </div>
  );
}
