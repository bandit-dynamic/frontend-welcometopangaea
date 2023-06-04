'use client';

import { FieldValues, useForm } from 'react-hook-form';

import { useMemo, useState } from "react"

import useSellModal from "@/app/hooks/useSellModal";

import Modal from "./Modal";
import Heading from '../Heading';
import { categories } from "../navbar/Categories";

import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload"

import dynamic from "next/dynamic";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const SellModal = () => {
    const sellModal = useSellModal();

    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset        
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            acreageCount: 1,
            imageSrc: '',
            price: 1,
            titel: '',
            description: ''
        }
    });

const category = watch('category');    
const location = watch('location');
const acreageCount = watch('acreageCount');
const imageSrc = watch('imageSrc');

const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
}), [location]);


const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
    })
}

const onBack = () => {
    setStep((value) => value -1);
};

const onNext = () => {
    setStep((value) => value +1);
};

const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE){
        return 'Create';
    }

    return 'Next';
}, [step]);

const secondaryActionLabel = useMemo (() => {
    if (step === STEPS.CATEGORY) {
        return undefined
    }

    return 'Back'
}, [step]);

let bodyContent = (
    <div className="flex flex-col gap-8">
        <Heading
            title="Which location best describes your property?"
            subtitle="Pick a category"
    />
    <div
        className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
        "
    >
        {categories.map ((item) => (
            <div key={item.label} className="col-span-1">
                <CategoryInput
                    onClick={(category) => 
                        setCustomValue('category', category)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                />

            </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your property located?"
                    subtitle="Help buyers find you!"
                />
                <CountrySelect 
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}                      
                />
                <Map 
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent= (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Basics about your property"
                    subtitle="What are some nearby activities and features?"
            />
            <Counter 
                title="Acreage:"
                subtitle="How many acres is your parcel?"
                value={acreageCount}
                onChange={(value) => setCustomValue('acreageCount', value)}
            />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent= (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Add photos"
                    subtitle="Show buyers your land"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }



    return ( 
        <Modal 
        isOpen={sellModal.isOpen}
        onClose={sellModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Sell your property!"
        body={bodyContent}
        />
     );
}
 
export default SellModal;