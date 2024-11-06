import { Input } from "@nextui-org/react";

export default function Home() {
  return (
    <div className='w-full bg-red-400'>
      Test
      <Input
            isClearable
            label="Product Name"
            required
            fullWidth
          />
    </div>
  )
}
