"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import NotFoundIcon from "./svg/not-found";
import cn from "@/helper/class-names";
// import { setCartEnabled } from "@/redux/slices/cart-slice";

export default function NotFound({
    custom
}: { custom?: any }) {
    const defaultCustom = {
        title: "We couldn't find any matches!",
        description: ' Please check the spelling or try searching something else',
        buttonTitle: 'Go to Back',
        pageRedirection: false,
        customPadding: '',
        imageUrl: '',
        customFunction: null,
        disablePAgeRedirection: true,
    };
    // const dispatch = useDispatch();
    const { back, push } = useRouter();
    const mergedCustom = { ...defaultCustom, ...custom };

    const handleOnClick = () => {
        // dispatch(setCartEnabled(false))
        if (mergedCustom.customFunction) {
            mergedCustom.customFunction(); // Conditionally call the function if it exists
        }
        if (mergedCustom.disablePAgeRedirection) {
            if (mergedCustom?.pageRedirection) {
                push(mergedCustom?.pageRedirection);
            } else {
                back();
            }
        }
    };

    return (
        <section className={cn(custom?.customPadding ?? "px-3 h-auto mx-auto mt-5 lg:px-15 xl:px-28 2xl:px-28")}>
            <div className="mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto text-center">
                    <div className="mb-4">
                        {mergedCustom?.imageUrl ? (
                            <div className="flex justify-center items-center">
                                <Image
                                    src={mergedCustom?.imageUrl}
                                    className="max-h-[100px] max-w-[100px] lg:max-w-[130px]  lg:max-h-[130px] w-ful rounded-lg "
                                    alt="..."
                                    width={400}
                                    height={400}
                                    quality={100}
                                    priority
                                />
                            </div>
                        ) : (
                            <NotFoundIcon />
                        )}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{mergedCustom.title}</h1>
                    <p className="text-gray-600 mb-4">
                        {mergedCustom.description}
                    </p>
                    <button
                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-primary border border-primary hover:text-primary hover:bg-secondary"
                        onClick={handleOnClick}
                    >
                        {mergedCustom.buttonTitle}
                    </button>
                </div>
            </div>
        </section>
    );
}
