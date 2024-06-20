import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FaArrowRight } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa';
import { Card} from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from './ui/dropdown-menu';

const fruits = ['Apples', 'Bananas', 'Strawberries'];
const vegetables = ['Broccoli', 'Carrots', 'Lettuce'];

interface RenderListProps {
  options: string[];
  onTransfer: (options: string[]) => void;
  type: 'forward' | 'backward';
}

const RenderList: React.FC<RenderListProps> = ({ options, onTransfer, type }) => {
  const [value, setValue] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const items = options
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <div
        key={item}
        className={`flex items-center gap-sm ${
          value.includes(item) ? 'bg-blue-200' : 'bg-white'
        } hover:bg-gray-100 p-2 cursor-pointer`}
        onClick={() => handleValueSelect(item)}
      >
        <input
          type="checkbox"
          className="mr-2 pointer-events-none"
          checked={value.includes(item)}
          onChange={() => {}}
        />
        <span>{item}</span>
      </div>
    ));

  return (
    <div className={`flex flex-col items-center ${type === 'backward' ? 'flex-row-reverse' : ''}`}>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search Amenties"
          className={`border px-2 py-1 rounded ${
            type === 'backward' ? 'border-l-0 border-tl' : 'border-r-0 border-tr'
          }`}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <Button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            type === 'backward' ? 'rounded-tl' : 'rounded-tr'
          }`}
          onClick={(e) => {
            e.preventDefault();
            onTransfer(value);
            setValue([]);
          }}
        >
          {type === 'backward' ? (<FaArrowLeft/>) : (<FaArrowRight/>)}
        </Button>
      </div>
      <Card className='p-2 mt-2'>
        {items.length > 0 ? items : <div className="text-gray-500">Nothing found!</div>}
      </Card>
      <DropdownMenu>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const TransferList: React.FC = () => {
  const [data, setData] = useState<[string[], string[]]>([fruits, vegetables]);

  const handleTransfer = (transferFrom: number, options: string[]) =>
    setData((current) => {
      const transferTo = transferFrom === 0 ? 1 : 0;
      const transferFromData = current[transferFrom].filter((item) => !options.includes(item));
      const transferToData = [...current[transferTo], ...options];

      const result = [];
      result[transferFrom] = transferFromData;
      result[transferTo] = transferToData;
      return result as [string[], string[]];
    });

  return (
    <div className="flex gap-8">
      <RenderList
        type="forward"
        options={data[0]}
        onTransfer={(options) => { handleTransfer(0, options)}}
      />
      <RenderList
        type="backward"
        options={data[1]}
        onTransfer={(options) => handleTransfer(1, options)}
      />
    </div>
  );
};
