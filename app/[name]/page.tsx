"use client"
import { Toast } from "@/uikit";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense } from "react";
const BuilderEditor = dynamic(() => import("@/components/builderEditor/build-editor.component"), { ssr: false })

export default function PageDetails() {
    const { name } = useParams<{ name: string }>()
    const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery({
        queryKey: ['builder-get-single-data', name],
        queryFn: () => fetch('http://localhost:5010/templete/' + name).then(res => res.json()),
    })

    if (isLoading || isFetching) {
        return <div className="flex justify-center items-center h-screen w-full">
            <Loader className="animate-spin w-12 h-12 text-red-500" />
        </div>
    }
    if (isError) {
        return <Toast.Error message={error.message} />
    }
    if (isSuccess) {
        return (
            <Suspense>
                <BuilderEditor data={data} />
            </Suspense>
        )
    }

}
