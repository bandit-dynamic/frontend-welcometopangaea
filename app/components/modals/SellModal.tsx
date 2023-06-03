'use client';

import { useMemo, useState } from "react"

import useSellModal from "@/app/hooks/useSellModal";

import Modal from "./Modal";
import Heading from '../Heading';
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";


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
                            onClick={() => {}}
                            selected={false}
                            label={item.label}
                            icon={item.icon}
                        />

                    </div>
                        ))}
                    </div>
                </div>
            )

    return ( 
        <Modal 
        isOpen={sellModal.isOpen}
        onClose={sellModal.onClose}
        onSubmit={sellModal.onClose}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Sell your property!"
        body={bodyContent}
        />
     );
}
 
export default SellModal;