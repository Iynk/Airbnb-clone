import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { FcElectricalSensor } from "react-icons/fc";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    category: {
        icon: IconType;
        label: string;
        description: string; } | undefined
    description: string;
    roomCount: number;
    guessCount: number;
    bathroomCount: number;
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guessCount,
    bathroomCount,
    locationValue
}) =>  {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div
            className='col-span-4 flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <div
                        className='
                        text-sm
                        font-semibold
                        flex
                        flex-row
                        items-center
                        gap-2'>
                <div>Hosted by {user?.name}</div>
                <Avatar 
                    src={user?.image} />
                </div>
                <div
                    className='flex flex-row items-center gap-4 font-light text-netural-500'>
                        <div>{guessCount} guests</div>
                        <div>{roomCount} rooms</div>
                        <div>{bathroomCount} bathrooms</div>
                    </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
            />
            )}
            <hr />
            <Map center={coordinates} />
            <div className='text-lg font-light text-neutral-500'>
                {description}
            </div>
        </div>
    );
}

export default ListingInfo;