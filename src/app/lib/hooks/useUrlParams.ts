import { useRouter, useSearchParams } from 'next/navigation';

interface IProps {
  searchParam: string;
  additionalString: string;
}
export const useUrlParams = ({ searchParam, additionalString }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlPage = searchParams.get(searchParam);

  const addToUrl = ({
    addedParameter,
    scroll = false,
  }: {
    addedParameter: number;
    scroll?: boolean;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(searchParam, addedParameter.toString());
    router.push(`${additionalString}${params.toString()}`, { scroll });
  };

  return {
    urlPage,
    addToUrl,
  };
};
