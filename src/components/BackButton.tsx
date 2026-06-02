import { Button, type ButtonProps } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps extends ButtonProps {
    to?: string;
    label?: string;
}

export default function BackButton({ to, label = 'Voltar', onClick, sx, ...props }: BackButtonProps) {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        } else if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <Button
            variant="text"
            startIcon={<ArrowLeft size={20} />}
            onClick={handleClick}
            sx={{
                width: 'fit-content',
                color: 'text.secondary',
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                py: 1,
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': {
                    bgcolor: 'action.hover',
                    color: 'primary.main',
                    transform: 'translateX(-4px)'
                },
                ...sx
            }}
            {...props}
        >
            {label}
        </Button>
    );
}
